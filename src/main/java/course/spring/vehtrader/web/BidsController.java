package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.BidsService;
import course.spring.vehtrader.model.Bid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/bids")
public class BidsController {
    @Autowired
    private BidsService bidsService;

    @GetMapping
    public List<Bid> getBids() {
        List<Bid> bids = new ArrayList<>();
        bidsService.findAll().subscribe(bids::add);
        return bids;
    }
}
