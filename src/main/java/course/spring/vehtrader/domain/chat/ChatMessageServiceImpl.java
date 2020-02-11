package course.spring.vehtrader.domain.chat;

import course.spring.vehtrader.exceptions.NonExistingEntityException;
import course.spring.vehtrader.model.chat.ChatMessage;
import course.spring.vehtrader.repo.chat.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    @Autowired
    ChatMessageRepository chatConversationRepository;

    @Override
    public Flux<ChatMessage> findAll() {
        return chatConversationRepository.findAll();
    }

    @Override
    public Mono<ChatMessage> findById(String id) {
        return chatConversationRepository.findById(id)
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("ChatConversation with ID:%s does not exist.", id))));
    }

    @Override
    public Mono<ChatMessage> create(ChatMessage chatConversation) {
        return chatConversationRepository.insert(chatConversation);
    }

    @Override
    public Mono<ChatMessage> update(ChatMessage chatConversation) {
        return chatConversationRepository.save(chatConversation);
    }



    @Override
    public Mono<ChatMessage> delete(String id) {
        return chatConversationRepository.findById(id)
                .flatMap(user -> chatConversationRepository.deleteById(id).thenReturn(user))
                .switchIfEmpty(Mono.error(new NonExistingEntityException(
                        String.format("ChatConversation with ID:%s does not exist.", id))));
    }

    @Override
    public Flux<ChatMessage> findBySenderAndReceiverId(String sender, String receiver) {
        return chatConversationRepository.findBySenderIdAndReceiverId(sender, receiver);
    }

//    @Override
//    public Flux<ChatConversation> findBySenderAndReceiverId(String sender, String receiver) {
//        return chatConversationRepository.findBySenderAndReceiver(sender, receiver);
//    }

    @Override
    public Flux<ChatMessage> findByChannelId(String channelId) {
        return chatConversationRepository.findByChannelId(channelId);
    }

    @Override
    public Flux<ChatMessage> findByChannelIdIdOrByChannelId(String channelId1, String channelId2) {
        List<String> channelIds = new ArrayList<>();
        channelIds.add(channelId1);
        channelIds.add(channelId2);
        return chatConversationRepository.findByChannelIdIsIn(channelIds);
    }

    @Override
    public Mono<Long> getCount() {
        return chatConversationRepository.count();
    }
}
