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
            var user = Mapper.Map<User>(_gameRepository.GetUser(id));
            var model = new ArenaModel {User = user};
            return View(model);
        }
    }
}