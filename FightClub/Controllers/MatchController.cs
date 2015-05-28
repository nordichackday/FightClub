using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using FightClub.Models;
using FightClub.Repository;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
    public class MatchController : Controller
    {
        private readonly GameRepository _gameRepository;
        public MatchController()
        {
            _gameRepository = new GameRepository();
        }

        public ActionResult Index(string user1, string user2)
        {
            var match = new Match() {User1 = user1, User2 = user2};
            return View(match);
        }

        public ActionResult Create(Match match)
        {
            //TODO : save
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