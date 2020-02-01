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


@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public Flux<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("{id}")
    public Mono<User> getUserBydId(@PathVariable String id) {
        return userService.findById(id);
    }

    @PostMapping
    public Mono<User> insertUser(@RequestBody User user){
        return userService.create(user);
    }

    @PutMapping("{id}")
    public Mono<User> updateUser(@PathVariable String id, @RequestBody User user){
        if(!id.equals(user.getId())) {
            throw new InvalidEntityException(
                    String.format("User ID='%s' is different from URL resource ID='%s'", user.getId(), id));
        }
        return userService.update(user);
    }

    @DeleteMapping("{id}")
    public Mono<User> deleteUser(@PathVariable String id){
        return userService.delete(id);
    }
}
