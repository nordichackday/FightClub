using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using FightClub.Models;

namespace FightClub.App_Start
{
    public static class AutoMapperInit
    {
        public static void Init()
        {
            Mapper.CreateMap<Repository.user, User>();
        }
    }
}