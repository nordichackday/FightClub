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
        
        public ActionResult Index(string id)
        {
            if (string.IsNullOrEmpty(id))
                return HttpNotFound();
            var dbuser = _gameRepository.GetUser(id);
            var user = Mapper.Map<User>(dbuser);
            var pendingMatches = Mapper.Map<List<Match>>(_gameRepository.GetPendingMatches(dbuser.id));
            var playedMatches = Mapper.Map<List<Match>>(_gameRepository.GetPlayedMatches(dbuser.id));
            var waiting = Mapper.Map<List<Match>>(_gameRepository.GetWaitingMatches(dbuser.id));
            var model = new ArenaModel
            {
                User = user,
                PendingMatches = pendingMatches,
                PlayedMatches =  playedMatches,
                WaitingMatches = waiting    
            };
            return View(model);
        }
    }
}