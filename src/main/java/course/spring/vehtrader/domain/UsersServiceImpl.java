package course.spring.vehtrader.domain;

import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.User;
import course.spring.vehtrader.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    UsersRepository usersRepository;

    @Override
//    @PostFilter("hasRole('ADMIN') or filterObject.email == authentication.principal.email")
    public List<User> findAll() {
        return usersRepository.findAll();
    }

    @Override
    public User findById(String id) {
        return usersRepository.findById(id).orElseThrow(() -> new NonExistingEntityException(
                String.format("User with id='%s' does not exist.", id)));
    }

    @Override
    public User findByUsername(String username) {
        return usersRepository.findByUsername(username).orElseThrow(() -> new NonExistingEntityException(
                String.format("User with username='%s' does not exist.", username)));
    }

    @Override
    public User create(User user) {
        if(user.getRoles() == null || user.getRoles().trim().length() == 0) {
            user.setRoles("ROLE_BLOGGER");
        }

        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
        user.setPassword(encoder.encode(user.getPassword()));
        user.setActive(true);
        return usersRepository.insert(user);
    }

    @Override
    public User update(User user) {
        Optional<User> old = usersRepository.findById(user.getId());

        if (!old.isPresent()) {
            throw new InvalidEntityException(
                    String.format("User with ID=\"%s\" does not exist.", user.getId()));
        }

        PasswordEncoder encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));

        return usersRepository.save(user);
    }

    @Override
    public User delete(String id) {
        Optional<User> target = usersRepository.findById(id);

        if (!target.isPresent()) {
            throw new NonExistingEntityException(
                    String.format("User with ID=\"%s\" does not exist.", id));
        }
        usersRepository.deleteById(id);

        return target.get();
    }

    @Override
    public Long getCount() {
        return usersRepository.count();
    }
}
