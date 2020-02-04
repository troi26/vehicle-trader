package course.spring.vehtrader.repo.chat;

import course.spring.vehtrader.model.chat.Message;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface MessageRepository extends ReactiveMongoRepository<Message, String> {
}
