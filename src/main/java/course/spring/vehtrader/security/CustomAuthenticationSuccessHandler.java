package course.spring.vehtrader.security;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import course.spring.vehtrader.model.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthenticationSuccessHandler implements
        AuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        User auth = (User) authentication.getPrincipal();
        HttpSession session = request.getSession();

        session.setAttribute("username", auth.getUsername());
        session.setAttribute("password", auth.getPassword());
        session.setAttribute("Name", auth.getName());
        session.setAttribute("Roles", auth.getRoles());
        session.setAttribute("Authorities", auth.getAuthorities());

        Map<String, Object> data = new HashMap<>();
        data.put(
                "timestamp",
                Calendar.getInstance().getTime());

        data.put("username", auth.getUsername());
        data.put("password", auth.getPassword());
        data.put("Name", auth.getName());
        data.put("Roles", auth.getRoles());
        data.put("Authorities", auth.getAuthorities());
        response.setStatus(HttpServletResponse.SC_OK);
        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        String authStr = auth.toString();
        out.print(authStr);
        out.flush();
    }
}
