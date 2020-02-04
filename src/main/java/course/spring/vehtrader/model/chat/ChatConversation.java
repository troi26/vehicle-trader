package course.spring.vehtrader.model.chat;

import course.spring.vehtrader.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("chat_conversations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatConversation {
    @Id
    String id;
    User user1;
    User user2;
    List<Message> messageHistory;
}
