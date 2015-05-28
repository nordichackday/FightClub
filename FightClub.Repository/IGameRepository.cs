using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FightClub.Model;
using Microsoft.Win32;

namespace FightClub.Repository
{
    public interface IGameRepository
    {
        user GetUser(string userName);
    }
}
