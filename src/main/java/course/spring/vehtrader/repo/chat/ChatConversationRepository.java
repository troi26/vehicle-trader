package course.spring.vehtrader.repo.chat;

import course.spring.vehtrader.model.chat.ChatConversation;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface ChatConversationRepository extends ReactiveMongoRepository<ChatConversation, String> {
}
