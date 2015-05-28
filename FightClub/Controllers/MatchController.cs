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
            var match = Mapper.Map<Match>(new match() { user1move1 = 1, user1move2 = 1, user1move3 = 1, user2move1 = 1, user2move2 = 1, user2move3 = null });
            return View(match);

        }

        public ActionResult Create(Match match)
        {
            //TODO :
            return View(new Match());
        }

        [HttpPost]
        public ActionResult Update(Match match)
        {
            // save 
            // if done replay else home to user
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