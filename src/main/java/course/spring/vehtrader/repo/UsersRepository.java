package course.spring.vehtrader.repo;

import course.spring.vehtrader.model.User;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface UsersRepository extends ReactiveMongoRepository<User, String> {
    
}
