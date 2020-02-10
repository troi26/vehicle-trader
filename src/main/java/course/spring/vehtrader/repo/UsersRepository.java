package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UsersRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    List<User> findAllByActiveFalse();
    List<User> findAllByActiveTrue();
    List<User> findAllByActiveTrueAndIdNot(String id);

    List<User> findAllByIdNot(String excludedId);
}
