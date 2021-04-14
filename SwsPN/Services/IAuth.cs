using SwsPN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwsPN.Services
{
    public interface IAuth
    {
        public Task<Users> Register(Users user, string password);
        public Task<Users> Login(string username, string password);
        public Task<bool> UserExists(string username);
        public Task<string> GetRole(int? id);
    }
}
