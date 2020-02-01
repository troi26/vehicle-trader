package course.spring.vehtrader.domain;

import course.spring.vehtrader.model.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface UserService {
    Flux<User> findAll();
    Mono<User> findById(String id);
    Mono<User> create(User user);
    Mono<User> update(User user);
    Mono<User> delete(String id);
    Mono<Long> getCount();
}
