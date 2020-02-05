package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.UserService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.ServerRequest;
import org.springframework.web.servlet.function.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("{username}")
    public User getUserByUsername(String username) {
        return userService.findByUsername(username);
    }

    @GetMapping("{id}")
    public User getUserBydId(@PathVariable String id) {
        return userService.findById(id);
    }

    @PostMapping
    public User insertUser(@RequestBody User user){
        return userService.create(user);
    }

    @PutMapping("{id}")
    public User updateUser(@PathVariable String id, @RequestBody User user){
        if(!id.equals(user.getId())) {
            throw new InvalidEntityException(
                    String.format("User ID='%s' is different from URL resource ID='%s'", user.getId(), id));
        }
        return userService.update(user);
    }

    @DeleteMapping("{id}")
    public User deleteUser(@PathVariable String id){
        return userService.delete(id);
    }
}
