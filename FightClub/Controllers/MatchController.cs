using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FightClub.Models;
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

        public ActionResult Create(string userid)
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