package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.model.Bid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@CrossOrigin
@RequestMapping("/api/bids")
public class BidsController {
    @Autowired
    private BidsService bidsService;

    @CrossOrigin
    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Bid> postBid(@RequestBody Bid bid, BindingResult bindingResult) {
        Mono<Bid> created = bidsService.create(bid);

        return created;
    }

    @CrossOrigin
    @GetMapping(params = "offerId", path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Bid> streamBids(@RequestParam("offerId") String offerId){
        return bidsService.findAllByOfferId(offerId);
    }

    @CrossOrigin
    @GetMapping(params = "userId", path = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Bid> streamBidsOfUser(@RequestParam("userId") String userId){
        return bidsService.findAllByUserId(userId);
    }
}
