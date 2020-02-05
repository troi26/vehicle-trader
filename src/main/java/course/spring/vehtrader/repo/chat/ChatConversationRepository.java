package course.spring.vehtrader.repo.chat;

import course.spring.vehtrader.model.chat.ChatConversation;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface ChatConversationRepository extends ReactiveMongoRepository<ChatConversation, String> {
    Flux<ChatConversation> findByUser1Id(String id);

    Flux<ChatConversation> findByUser2Id(String id);
}
