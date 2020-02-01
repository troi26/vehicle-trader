package course.spring.vehtrader.domain;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.User;
import course.spring.vehtrader.repo.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UsersRepository usersRepository;
    @Override
    public Flux<User> findAll() {
        return usersRepository.findAll();
    }

    @Override
    public Mono<User> findById(String id) {
        return usersRepository.findById(id)
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("User with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<User> create(User user) {
        return usersRepository.insert(user);
    }

    @Override
    public Mono<User> update(User user) {
        return usersRepository.save(user);
    }

    @Override
    public Mono<User> delete(String id) {
        return usersRepository.findById(id)
                .flatMap(user -> usersRepository.deleteById(id).thenReturn(user))
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("User with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<Long> getCount() {
        return usersRepository.count();
    }
}
