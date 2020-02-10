package course.spring.vehtrader.config;

import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.security.CustomAuthenticationFailureHandler;
import course.spring.vehtrader.security.CustomLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@EnableWebSecurity

@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Qualifier("customAuthenticationSuccessHandler")
    @Autowired
    AuthenticationSuccessHandler authenticationSuccessHandler;

    @Autowired
    CustomLogoutSuccessHandler logoutSuccessHandler;

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
//                .antMatchers(HttpMethod.GET, "/user", "/api/bids/**", "/api/offers/**", "/api/users/**").authenticated()//.authenticated()
//                .antMatchers(HttpMethod.POST).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
//                .antMatchers(HttpMethod.PUT).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
//                .antMatchers(HttpMethod.DELETE).authenticated()//.hasAnyRole("BLOGGER", "ADMIN")
                // За да се тества в реално време промените с реакт с "npm start" скрипта, трябва да се
                // ЗАКОМЕНТИРАТ предишните 4 реда, които искат да си аутентикиран за достъп до руутовете
                // и да се РАЗКОМЕНТИРАТ следващите 4 реда, където всичко се позволява.
                .antMatchers(HttpMethod.GET,"/"/*, "/home"*/, "/perform*", "/api/bids/**", "/api/users/**","/api/offers/**", "/**").permitAll()//.authenticated()
                .antMatchers(HttpMethod.POST,"/"/*, "/home"*/, "/perform*","/api/bids/**", "/api/users/**","/api/offers/**", "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.PUT,"/"/*, "/home"*/, "/perform*", "/api/bids/**", "/api/users/**","/api/offers/**", "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,"/"/*, "/home"*/, "/perform*","/api/bids/**", "/api/users/**","/api/offers/**", "/**").permitAll()//.hasAnyRole("BLOGGER", "ADMIN")
                // Тест за логин
//                .antMatchers(HttpMethod.GET, "/"/*, "/home"*/, "/perform*").permitAll()
//                .antMatchers(HttpMethod.POST, "/"/*, "/home"*/, "/perform*").permitAll()
                .and()
                .formLogin().loginPage("/")
                .loginProcessingUrl("/perform_login")
                .successHandler(authenticationSuccessHandler)
                .failureHandler(customAuthenticationFailureHandler())
                .permitAll()
                .and()
                .logout()
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .logoutUrl("/perform_logout")
                .logoutSuccessHandler(logoutSuccessHandler)
                .deleteCookies("JSESSIONID");
    }


    @Bean
    public AuthenticationFailureHandler customAuthenticationFailureHandler() {
        return new CustomAuthenticationFailureHandler();
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
}
