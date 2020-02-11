package course.spring.vehtrader.web.forum;

import course.spring.vehtrader.domain.forum.ForumService;
import course.spring.vehtrader.exceptions.InvalidEntityException;
import course.spring.vehtrader.model.forum.ForumPage;
import course.spring.vehtrader.model.forum.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/forum")
public class ForumController {
    @Autowired
    private ForumService forumService;

    @GetMapping
    public List<ForumPage> getAllForumPages() {
        return forumService.findAll();
    }

    @GetMapping("{topic}")
    public ForumPage getForumPageByTopic(@PathVariable String topic) {
        return forumService.findByTopic(topic);
    }

//    @GetMapping(params = "id")
//    public ForumPage getForumPage(@RequestParam("id") String id) {
//        return forumService.findById(id);
//    }

    @PostMapping
    public ForumPage insertForumPage(@Valid @RequestBody ForumPage page) {
        return forumService.create(page);
    }

    @PostMapping("{topic}")
    public ForumPage insertPostIntoPage(@PathVariable String topic, @Valid @RequestBody Post post) {
        return forumService.insertPostIntoForumPage(topic, post);
    }

    @PutMapping("{topic}")
    public ForumPage updateForumPage(@PathVariable String topic, @Valid @RequestBody ForumPage page) {
        if (!topic.equals(page.getTopic())) {
            throw new InvalidEntityException(
                    String.format("ForumPage ID='%s' is different from URL resource ID='%s'", page.getTopic(), topic));
        }
        return forumService.update(page);
    }

    @PutMapping("/{topic}/{postId}")
    public ForumPage updateForumPage(@PathVariable String topic, @PathVariable String postId, @Valid @RequestBody Post newPost) {
       return forumService.updatePostFromForumPage(topic, postId, newPost);
    }

    @DeleteMapping("/{topic}/{postId}")
    public ForumPage deleteForumPage(@PathVariable String topic, @PathVariable String postId) {
        return forumService.deletePostFromForumPage(topic, postId);
    }

    @DeleteMapping("{topic}")
    public ForumPage deleteForumPage(@PathVariable String topic) {
        return forumService.delete(topic);
    }
}
