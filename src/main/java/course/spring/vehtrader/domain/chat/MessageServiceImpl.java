package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.chat.Message;
import course.spring.vehtrader.repo.chat.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    MessageRepository messageRepository;
    @Override
    public Flux<Message> findAll() {
        return messageRepository.findAll();
    }

    @Override
    public Mono<Message> findById(String id) {
        return messageRepository.findById(id)
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("Message with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<Message> create(Message message) {
        return messageRepository.insert(message);
    }

    @Override
    public Mono<Message> update(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public Mono<Message> delete(String id) {
        return messageRepository.findById(id)
                .flatMap(user -> messageRepository.deleteById(id).thenReturn(user))
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("Message with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<Long> getCount() {
        return messageRepository.count();
    }
}
