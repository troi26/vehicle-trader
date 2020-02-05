package course.spring.vehtrader.config;

import course.spring.vehtrader.domain.UserService;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration

// Наличието на тази анотация изключва автоматичната секюрити конфигурация,
// тоест за да има такава трябва да си дефинираме ние, както сме направили в класа по - долу.

@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
        org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class}
)

// Ако ЗАКОМЕНТИРАМЕ реда @EnabledWebSecurity
// ще се изключи конфигурацията, която сме дефинирали по - долу
// Така че за да НЯМА секюрити горанта анотация:
// @SpringBootApplication -> трябва да НЕ е закоментирана, а тази по-долу:
// @EnabledWebSecurity -> закоментира

//@EnableWebSecurity

@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure (HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .exceptionHandling()
                .and()
                .authorizeRequests()
                .antMatchers("/actuator/info").permitAll()
                .antMatchers("/actuator/health").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/swagger*/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/bids/**", "/api/users/**").authenticated()//.authenticated()
                .antMatchers(HttpMethod.POST, "/**").authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.PUT).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.DELETE).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                .and()
                .formLogin()
                .permitAll()
                .and()
                .logout()
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .logoutUrl("/logout");
    }

    @Bean
    public UserDetailsService userDetailsService(UserService usersService) {

        return username -> {
            try {
                String name = usersService.findByUsername(username).getUsername();
                return usersService.findByUsername(username);
            } catch (NonExistingEntityException ex) {
                throw new UsernameNotFoundException(ex.getMessage(), ex);
            }
        };

    }

}
