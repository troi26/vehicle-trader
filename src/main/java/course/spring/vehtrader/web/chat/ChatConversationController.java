package course.spring.vehtrader.web.chat;

import course.spring.vehtrader.domain.chat.ChatMessageService;
import course.spring.vehtrader.model.chat.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/chat")
public class ChatConversationController {

    @Autowired
    private ChatMessageService chatConversationService;

    @GetMapping
    public Flux<ChatMessage> getAllChatConversations() {
        return chatConversationService.findAll();
    }

    @GetMapping("{id}")
    public Mono<ChatMessage> getChatConversationById(@PathVariable String id) {
        return chatConversationService.findById(id);
    }

    @GetMapping(path = "/channel/{channelId}", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<ChatMessage> getChatConversationByUserId(@PathVariable String channelId) {
        return chatConversationService.findByChannelId(channelId);
    }

    @GetMapping(path = "/senderAndReceiver/{senderId}/{receiverId}", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<ChatMessage> getChatConversationByUserId(@PathVariable String senderId, @PathVariable String receiverId) {
        return chatConversationService.findBySenderAndReceiverId(senderId, receiverId);
    }

    @PostMapping
    public Mono<ChatMessage> insertChatConversation(@RequestBody ChatMessage chatConversation) {
        return chatConversationService.create(chatConversation);
    }


    //We don't want PutMethod because that way one could alter the message history.

//    @PutMapping("{id}")
//    public Mono<ChatConversation> updateChatConversation(@PathVariable String id, @RequestBody ChatConversation chatConversation){
//        if(!id.equals(chatConversation.getId())) {
//            throw new InvalidEntityException(
//                    String.format("User ID='%s' is different from URL resource ID='%s'", chatConversation.getId(), id));
//        }
//        return chatConversationService.update(chatConversation);
//    }

    @DeleteMapping("{id}")
    public Mono<ChatMessage> deleteChatConversation(@PathVariable String id) {
        return chatConversationService.delete(id);
    }
}
