package course.spring.vehtrader.web;//package course.spring.vehtrader.web;

import course.spring.vehtrader.model.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/")
public class LoggedController {

    @RequestMapping(path = "/user")
    public ResponseEntity<User> getLogged(Authentication auth,
                                                    HttpServletResponse response) {
//        Object us = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

//        ResponseEntity<User> response = new ResponseEntity<User>();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        response.setContentType("application/json");

        if (auth == null) {
            return new ResponseEntity<>(new User(), headers, HttpStatus.NOT_FOUND);
        } else {
            User user = (User) auth.getPrincipal();
            return new ResponseEntity<>(user, headers, HttpStatus.OK);
        }
    }
}
