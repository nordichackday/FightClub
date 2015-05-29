using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using FightClub.Models;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
    [RoutePrefix("match")]
    public class MatchController : Controller
    {
        private readonly GameRepository _gameRepository;
        public MatchController()
        {
            _gameRepository = new GameRepository();
        }
        [Route("start/{user1}/vs/{user2}")]
        public ActionResult Start(string user1, string user2)
        {
            var match = new Match() {User1 = user1, User2 = user2};
            ViewBag.ActiveUser = "User1";
            return View("Index",match);
        }

        [Route("anwser/{matchid}")]
        public ActionResult Anwser(int matchid)
        {
            ViewBag.ActiveUser = "User2";
            var match = Mapper.Map<Match>(_gameRepository.GetMatchByMatchId(matchid));
            return View("Index",match);
        }

        [HttpPost]
        public ActionResult Create(Match match)
        {
            match.Created = DateTime.Now;
            match.User2Move1 = match.User2Move2 = match.User2Move3 = null;

            
            _gameRepository.CreateMatch(Mapper.Map<Repository.match>(match));
            return RedirectToAction("Index", "User", new {id = match.User1});
        }

        [HttpPost]
        public ActionResult Update(Match match)
        {
            // calc & save 
            
            return Replay(match);
        }

        public ActionResult Replay(Match match)
        {
            return View(match);
        }

        public ActionResult Replay(string id)
        {
            //var match = Mapper.Map<Match>(_gameRepository.GetMatch(id));
            var match = new Match();
            return View(match);
        }
    }
}