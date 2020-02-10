package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.UsersService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.ui.ModelMap;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
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
