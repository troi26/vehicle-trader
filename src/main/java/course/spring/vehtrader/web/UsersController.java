package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<User> getAllUsers() {
        return usersService.findAll();
    }

    @GetMapping("{username}")
    public User getUserByUsername(@PathVariable("username") String username) {
        return usersService.findByUsername(username);
    }

    @GetMapping("{id}")
    public User getUserBydId(@PathVariable("id") String id) {
        return usersService.findById(id);
    }

    @PostMapping
    public User insertUser(@RequestBody User user){
        return usersService.create(user);
    }

    @PutMapping("{id}")
    public User updateUser(@PathVariable("id") String id, @RequestBody User user){
        if(!id.equals(user.getId())) {
            throw new InvalidEntityException(
                    String.format("User ID='%s' is different from URL resource ID='%s'", user.getId(), id));
        }
        return usersService.update(user);
    }

    @DeleteMapping("{id}")
    public User deleteUser(@PathVariable("id") String id){
        return usersService.delete(id);
    }
}
