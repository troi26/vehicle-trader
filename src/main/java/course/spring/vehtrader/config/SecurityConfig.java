package course.spring.vehtrader.config;

import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;


// Наличието на тази анотация изключва автоматичната секюрити конфигурация,
// тоест за да има такава трябва да си дефинираме ние, както сме направили в класа по - долу.

//@SpringBootApplication(exclude = {
//        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
//        org.springframework.boot.actuate.autoconfigure.security.servlet.ManagementWebSecurityAutoConfiguration.class}
//)

// Ако ЗАКОМЕНТИРАМЕ реда @EnabledWebSecurity
// ще се изключи конфигурацията, която сме дефинирали по - долу
// Така че за да НЯМА секюрити горанта анотация:
// @SpringBootApplication -> трябва да НЕ е закоментирана, а тази по-долу:
// @EnabledWebSecurity -> закоментира

//@Configuration
@EnableWebSecurity

@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure (HttpSecurity http) throws Exception {
        http
                .cors().and() // Comment this line to disable cors (Cross Origin Requests)
                .csrf().disable()
//                .addFilterBefore(new CorsFilter(), ChannelProcessingFilter.class)
                .exceptionHandling()
                .and()
                .authorizeRequests()
                .antMatchers("/actuator/info").permitAll()
                .antMatchers("/actuator/health").permitAll()
                .antMatchers("/v2/api-docs").permitAll()
                .antMatchers("/swagger*/**").permitAll()
                .antMatchers(HttpMethod.GET, "/", "/api/bids/**", "/api/users/**").authenticated()//.authenticated()
                .antMatchers(HttpMethod.POST).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.PUT).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.DELETE).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                // За да се тества в реално време промените с реакт с "npm start" скрипта, трябва да се
                // ЗАКОМЕНТИРАТ предишните 4 реда, които искат да си аутентикиран за достъп до руутовете
                // и да се РАЗКОМЕНТИРАТ следващите 4 реда, където всичко се позволява.
//                .antMatchers(HttpMethod.GET, "/api/bids/**", "/api/users/**", "/**").permitAll()//.authenticated()
//                .antMatchers(HttpMethod.POST, "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
//                .antMatchers(HttpMethod.PUT, "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
//                .antMatchers(HttpMethod.DELETE, "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
//                .antMatchers("/index", "/", "/home", "/login", "/user").permitAll()
                .and()
                .formLogin()
//                .defaultSuccessUrl("/", true)
                .permitAll()
                .and()
                .logout()
                .deleteCookies("JSESSIONID")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .logoutUrl("/logout");
    }

    @Bean
    public UserDetailsService userDetailsService(UsersService usersService) {

        return username -> {
            try {
                String name = usersService.findByUsername(username).getUsername();
                return usersService.findByUsername(username);
            } catch (NonExistingEntityException ex) {
                throw new UsernameNotFoundException(ex.getMessage(), ex);
            }
        };

    }


//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
//        return source;
//    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
////        configuration.addAllowedOrigin("localhost:3000");
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "OPTIONS", "PUT"));
//        System.out.println(configuration.getAllowedOrigins());
//        System.out.println(configuration.getAllowedMethods());
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

//    @Bean
//    CorsConfigurationSource corsConfigurationSource()
//    {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedOrigin("https://localhost:3000");
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "OPTIONS", "PUT"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }

}
