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
    public class UserController : Controller
    {
        private readonly GameRepository _gameRepository;

        public UserController()
        {
            _gameRepository = new GameRepository();
        }
        // GET: User
        public ActionResult Index(string id)
        {
            var dbuser = _gameRepository.GetUser(id);
            var user = Mapper.Map<User>(dbuser);
            var model = new ArenaModel
            {
                User = user,
                PendingMatches = Mapper.Map<List<Match>>(_gameRepository.GetPendingMatches(dbuser.id)),
                PlayedMatches = Mapper.Map<List<Match>>(_gameRepository.GetPlayedMatches(dbuser.id)),
                WaitingMatches = Mapper.Map<List<Match>>(_gameRepository.GetWaitingMatches(dbuser.id)),
            };
            return View(model);
        }
    }
}