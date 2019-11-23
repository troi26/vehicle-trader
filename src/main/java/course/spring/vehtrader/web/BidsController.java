package course.spring.vehtrader.web;

import course.spring.vehtrader.domain.BidsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bids")
public class BidsController {
    @Autowired
    BidsService bidsService;
}
