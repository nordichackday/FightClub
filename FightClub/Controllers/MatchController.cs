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
            var dbuser1 = _gameRepository.GetOpponent(user1);
            var dbuser2 = _gameRepository.GetOpponent(user2);
            var match = new Match() { User1 = user1, User2 = user2, User1Id = dbuser1.id, User2Id = dbuser2.id};
            ViewBag.ActiveUser = "User1";
            return View("Index", match);
        }

        [Route("anwser/{matchid}")]
        public ActionResult Anwser(int matchid)
        {
            ViewBag.ActiveUser = "User2";
            var match = Mapper.Map<Match>(_gameRepository.GetMatchByMatchId(matchid));
            match.User1 = _gameRepository.GetUserById(match.User1Id).username;
            match.User2 = _gameRepository.GetUserById(match.User2Id).username;
            return View("Index", match);
        }

        [HttpPost]
        [Route("create")]
        public ActionResult Create(Match match)
        {
            match.Created = DateTime.Now;
            match.User2Move1 = match.User2Move2 = match.User2Move3 = null;
            match.Resolved = false;
            _gameRepository.CreateMatch(Mapper.Map<Repository.match>(match));
            return RedirectToAction("Index", "User", new { id = match.User1 });
        }

        [HttpPost]
        [Route("update")]
        public ActionResult Update(Match match)
        {
            var dbMatch = Mapper.Map<Match>(_gameRepository.GetMatchByMatchId(match.Id.Value));
            if (dbMatch.Resolved.GetValueOrDefault(false))
                throw new Exception("Invalid update, match already resolved");
            
            dbMatch.User2Move1 = match.User2Move1;
            dbMatch.User2Move2 = match.User2Move2;
            dbMatch.User2Move3 = match.User2Move3;
            var user1Moves = new[] {dbMatch.User1Move1, dbMatch.User1Move2, dbMatch.User1Move3};
            var user2Moves = new[] {dbMatch.User2Move1, dbMatch.User2Move2, dbMatch.User2Move3};
            dbMatch.User1Points = 0;
            dbMatch.User2Points = 0;
            foreach (var moveid in Enumerable.Range(0,2))
            {
                var u1 = user1Moves[moveid];
                var u2 = user2Moves[moveid];
                if (u1 == null || u2 == null)
                {
                    throw new Exception("invalid move data detected");
                }
                if ((u1 == Move.BlockHigh && u2 == Move.HitHigh) ||
                    (u1 == Move.BlockMiddle && u2 == Move.HitMiddle) ||
                    (u1 == Move.BlockLow && u2 == Move.HitLow))
                {
                    dbMatch.User1Points += 2;
                    continue;
                }
                
                if ((u2 == Move.BlockHigh && u1 == Move.HitHigh) ||
                    (u2 == Move.BlockMiddle && u1 == Move.HitMiddle) ||
                    (u2 == Move.BlockLow && u1 == Move.HitLow))
                {
                    dbMatch.User2Points += 2;
                    continue;
                }

                if ((u1 == Move.HitHigh && u2 == Move.HitHigh) ||
                    (u1 == Move.HitMiddle && u2 == Move.HitMiddle) ||
                    (u1 == Move.HitLow && u2 == Move.HitLow))
                {
                    // tie
                    continue;
                }

                if ((u1 == Move.HitHigh) ||
                    (u1 == Move.HitMiddle) ||
                    (u1 == Move.HitLow))
                {
                    dbMatch.User1Points += 1;
                }

                if ((u2 == Move.HitHigh) ||
                    (u2 == Move.HitMiddle) ||
                    (u2 == Move.HitLow))
                {
                    dbMatch.User2Points += 1;
                }
            }
            var user1 = _gameRepository.GetUserById(dbMatch.User1Id);
            var user2 = _gameRepository.GetUserById(dbMatch.User2Id);
            user1.score += dbMatch.User1Points.Value;
            user2.score += dbMatch.User2Points.Value;
            if (dbMatch.User1Points > dbMatch.User2Points)
            {
                user1.wins++;
                user2.losses++;
                dbMatch.Result = 1;
            }
            else if (dbMatch.User2Points > dbMatch.User1Points)
            {
                user2.wins++;
                user1.losses++;
                dbMatch.Result = 2;
            }
            else
            {
                dbMatch.Result = 0;
            }
            dbMatch.Resolved = true;
            dbMatch.SolvedTime = DateTime.Now;
            _gameRepository.UpdateUser(user1);
            _gameRepository.UpdateUser(user2);
            _gameRepository.UpdateMatch(Mapper.Map<Repository.match>(dbMatch));
            return View("Replay", dbMatch);
        }

        [Route("replay/{id}")]
        public ActionResult Replay(int id)
        {
         
            var match = Mapper.Map<Match>(_gameRepository.GetMatchByMatchId(id));
            return View(match);
        }
    }
}