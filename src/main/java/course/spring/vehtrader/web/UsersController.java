package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersService usersService;

    @GetMapping
    public List<User> getAllUsers() {
        return usersService.findAll();
    }

    @GetMapping(path = "/accounts/inactive")
    public List<User> getAllInactiveAccounts() {
        return usersService.findInactiveAccounts();
    }

    @GetMapping(path = "/accounts/active")
    public List<User> getAllActiveAccounts() {
        return usersService.findActiveAccounts();
    }

    @GetMapping(path = "/accounts/active/others", params = "id")
    public List<User> getAllActiveAccountsNotMe(@RequestParam("id") String myId) {
        return usersService.findActiveAccountsNotMe(myId);
    }

    @PutMapping(path = "/accounts/activate", params = "id")
    public String activateAccount(@RequestParam("id") String userId) {
        User account = usersService.findById(userId);
        account.setActive(true);
        String id = usersService.update(account).getId();
        return id;
    }

    @PutMapping(path = "/accounts/deactivate", params = "id")
    public String deactivateAccount(@RequestParam("id") String userId) {
        User account = usersService.findById(userId);
        account.setActive(false);
        String id = usersService.update(account).getId();
        return id;
    }

    @GetMapping(path = "/accounts/excluded", params = "id")
    public List<User> getAllUsersExcludedId(@RequestParam("id") String exclUserId) {
        List<User> accounts = usersService.findAllByIdNot(exclUserId);
        return accounts;
    }

    @GetMapping(params = "username")
    public User getUserByUsername(@RequestParam("username") String username) {
        return usersService.findByUsername(username);
    }

    @GetMapping(params = "id")
    public UserDetails getUserBydId(@RequestParam("id") String id) {
        UserDetails user = usersService.findById(id);
        return user;
    }

    @PostMapping
    public User insertUser(@RequestBody User user) {
      return usersService.create(user);
    }

//    @RequestMapping(path = "/register", method = RequestMethod.POST,
//            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    @PostMapping(path = "/register")
    public ResponseEntity<String> createAccountUser(@Valid @RequestBody User user/*MultiValueMap<String, String> userForm*/,
                                                    HttpServletResponse response) {
//        User user = new User(userForm.getFirst("username"),
//                userForm.getFirst("name"), userForm.getFirst("surname"),
//                userForm.getFirst("email"), Double.parseDouble(userForm.getFirst("cashAmount")),
//                userForm.getFirst("password"), userForm.getFirst("roles"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        response.setContentType("application/json");
        try {
            usersService.findByUsername(user.getUsername());
        } catch (NonExistingEntityException ex) {
            user.setActive(false);
            usersService.create(user);
            return new ResponseEntity<>(String.format("{ \"registered\": %b }", true),
                    headers, HttpStatus.CREATED);
        }


        return new ResponseEntity<>(String.format("{ \"registered\": %b, \"errorMsg\": \"%s\", \"field\": \"%s\" }",
                false, "Username already taken", "username"),
                headers, HttpStatus.CONFLICT);
//        ResponseEntity<String> response1 = new ResponseEntity<>(,
//                HttpStatus.CONFLICT);
//        return response;
    }

    @CrossOrigin
    @PutMapping(params = "id")
    public User updateUser(@RequestParam("id") String id, @RequestBody User user){
        if(!id.equals(user.getId())) {
            throw new InvalidEntityException(
                    String.format("User ID='%s' is different from URL resource ID='%s'", user.getId(), id));
        }
        return usersService.update(user);
    }

    @DeleteMapping(params = "id")
    public User deleteUser(@RequestParam("id") String id){
        return usersService.delete(id);
    }


    @RequestMapping(value = "/uploadUserPhoto", method = RequestMethod.POST)
    public ResponseEntity<String> submitUserPhoto(@RequestParam("files") MultipartFile[] files, ModelMap modelMap) {
        modelMap.addAttribute("files", files);

        if (!files[0].isEmpty() && files[0].getOriginalFilename().length() > 0) {
            String fileName = files[0].getOriginalFilename().replaceFirst(".png", "");
            User user = usersService.findById(fileName);

            if (user.getAvatarUrl() != null && fileName.equals(user.getAvatarUrl().replaceFirst(".png", ""))) {
                fileName += "_user1.png";
            } else {
                fileName += "user.png";
            }

            if (Pattern.matches(".+\\.(jpg|png|jpeg)", files[0].getOriginalFilename())) {

                handleMultipartFile(files[0], fileName);
            } else {
                return new ResponseEntity<>(String.format("{ \"avatarUrl\": \"no_avatar.png\" }"),
                        HttpStatus.CONFLICT);
            }

            return new ResponseEntity<String>(String.format("{ \"avatarUrl\":  \"%s\" }", fileName),
                    HttpStatus.OK);
        }

        return new ResponseEntity<>(String.format("{ \"avatarUrl\": \"no_avatar.png\" }"),
                HttpStatus.CONFLICT);
    }

    private void handleMultipartFile (MultipartFile file, String filename) {
//        String name = file.getOriginalFilename();
        long size = file.getSize();

        String path = filename;
        try {
            File currentDir = new File("uploads");
            if(!currentDir.exists()) {
                currentDir.mkdirs();
            }

            path = currentDir.getAbsolutePath() + "/" + filename;
            path = new File(path).getAbsolutePath();
//            log.info(path);
            File f = new File(path);
            FileCopyUtils.copy(file.getInputStream(), new FileOutputStream(f));
        } catch (IOException ex) {
            System.out.printf("ERROR copying file!!! %s [%d]", path, file.getSize());
        }
    }
}
