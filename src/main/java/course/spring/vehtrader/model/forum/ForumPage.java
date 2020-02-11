package course.spring.vehtrader.model.forum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import java.util.List;

@Document("forum")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ForumPage {
    @Id
    String id;
    @NonNull
    @NotNull
    String topic;
    List<Post> posts;
}