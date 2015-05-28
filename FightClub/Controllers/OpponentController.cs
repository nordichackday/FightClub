using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.UI.WebControls;
using FightClub.Models;
using FightClub.Repository;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
    public class OpponentController : ApiController
    {
        private GameRepository _repo;

        public OpponentController()
        {
            _repo = new GameRepository();
        }
        [HttpGet]
        //Api/Opponent?username=mfeh
        public User GetOpponentByUserName(string username)
        {
           return AutoMapper.Mapper.Map<User>(_repo.GetUser(username));
        }
        //Api/Opponent
        [HttpGet]
        public User GetRandomOpponent()
        {
            return AutoMapper.Mapper.Map<User>(_repo.GetRandomOpponent());
        }
    }
}
