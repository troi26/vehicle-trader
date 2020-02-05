package course.spring.vehtrader.init;

import course.spring.vehtrader.domain.UserService;
import course.spring.vehtrader.model.User;
import lombok.extern.apachecommons.CommonsLog;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Slf4j
@CommonsLog
@Component
public class DataInitializer implements ApplicationRunner {
    @Autowired
    private UserService usersService;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        long cnt = usersService.getCount();
        System.out.printf("USERS: %d", cnt);
        if (cnt == 0) {
            System.out.printf("USERS: %d", cnt);
            User user = new User("admin", "Admin", "Admin", "admin@gmail.com",
                    "aDmin123&");
            usersService.create(user);
        }
    }
}
