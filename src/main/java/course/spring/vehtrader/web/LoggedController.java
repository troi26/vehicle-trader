package course.spring.vehtrader.web;//package course.spring.vehtrader.web;

import course.spring.vehtrader.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class LoggedController {

    @RequestMapping(path = "/user")
    public User getLogged(Authentication auth) {
        Object us = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (auth == null) {
            return new User();
        } else {
            User user = (User) auth.getPrincipal();
            return user;
        }
    }
}
