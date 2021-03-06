package course.spring.vehtrader.web.chat;

import course.spring.vehtrader.domain.chat.ChatMessageService;
import course.spring.vehtrader.model.chat.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatConversationController {

    @Autowired
    private ChatMessageService chatConversationService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping
    public Flux<ChatMessage> getAllChatConversations() {
        return chatConversationService.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("{id}")
    public Mono<ChatMessage> getChatConversationById(@PathVariable String id) {
        return chatConversationService.findById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/channel/{channelId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatMessage> getChatConversationByUserId(@PathVariable String channelId) {
        return chatConversationService.findByChannelId(channelId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/channel/{senderId}/{receiverId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<ChatMessage> getChatConversationByChannelIds(@PathVariable String senderId,
                                                         @PathVariable String receiverId) {
        return chatConversationService.findByChannelIdIdOrByChannelId(
                String.format("%s%s", senderId, receiverId),
                String.format("%s%s", receiverId, senderId));
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/senderAndReceiver/{senderId}/{receiverId}", produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
    public Flux<ChatMessage> getChatConversationByUserId(@PathVariable String senderId, @PathVariable String receiverId) {
        return chatConversationService.findBySenderAndReceiverId(senderId, receiverId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping
    public Mono<ChatMessage> insertChatConversation(@Valid @RequestBody ChatMessage chatConversation) {
        chatConversation.setChannelId(String.format("%s%s",
                chatConversation.getSenderId(), chatConversation.getReceiverId()));
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

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("{id}")
    public Mono<ChatMessage> deleteChatConversation(@PathVariable String id) {
        return chatConversationService.delete(id);
    }
}
