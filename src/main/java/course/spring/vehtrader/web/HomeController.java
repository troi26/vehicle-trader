package course.spring.vehtrader.web;

import course.spring.vehtrader.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Controller
@RequestMapping("/")
@EnableWebMvc
public class HomeController {

    @GetMapping
    public String index(Model model,
                        Authentication auth) {
        User logged = (User) auth.getPrincipal();
        model.addAttribute("logged", logged);
        return "index";
    }

}
