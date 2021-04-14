using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SwsPN.Models;
using SwsPN.Services;

namespace SwsPN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrWrsController : ControllerBase
    {
        private readonly SwsDBContext _context;
        public static IWebHostEnvironment _environment;
        private readonly IEmailSender _emailSender;

        public ErrWrsController(SwsDBContext context, IWebHostEnvironment environment, IEmailSender emailSender)
        {
            _context = context;
            _environment = environment;
            _emailSender = emailSender;
        }


        // GET: api/ErrWrs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErrWrs>>> GetErrWrs()
        {
            return await _context.ErrWrs.ToListAsync();
        }

        // GET: api/ErrWrs
        [HttpGet("email")]
        public async Task<ActionResult> SendEmail()
        {
            Message message = new Message(new string[] { "ats.medjellab@gmail.com", "bellous.mohammed@hotmail.com" }, "Test", "Test");
            _emailSender.SendEmail(message);
            return Ok(new { send = "good" });
        }


        [HttpGet("notreported")]
        public async Task<ActionResult<IEnumerable<ErrWrs>>> GetErrWrsNotReported()
        {
            return await _context.ErrWrs.Include(i => i.OperationNumNavigation).Where(w => (bool)w.Reported == false).ToListAsync();
        }

        [HttpGet("alreadyreported")]
        public async Task<ActionResult<IEnumerable<ErrWrs>>> GetErrWrsAlreadyReported()
        {
            return await _context.ErrWrs.Include(i => i.OperationNumNavigation).Where(w => (bool)w.Reported == true).ToListAsync();
        }

        // GET: api/ErrWrs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ErrWrs>> GetErrWrs(int id)
        {
            var errWrs = await _context.ErrWrs.FindAsync(id);

            if (errWrs == null)
            {
                return NotFound();
            }

            return errWrs;
        }

        // PUT: api/ErrWrs/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        /*[HttpPut("{id}")]
        public async Task<IActionResult> PutErrWrs(int id, ErrWrs errWrs)
        {
            if (id != errWrs.Id)
            {
                return BadRequest();
            }

            _context.Entry(errWrs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrWrsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }*/

        // GET: api/ErrWrs/5
        [HttpPut("{id}")]
        public async Task<ActionResult<ErrWrs>> EditErrWrs(int id, [FromForm] IFormFile plans, [FromForm] string error)
        {
            var errwrs = JsonConvert.DeserializeObject<ErrWrs>(error);

            if (id != errwrs.Id)
            {
                return BadRequest();
            }

            var errWrs = await _context.ErrWrs.FindAsync(id);

            if (errWrs == null)
            {
                return NotFound();
            }
            else
            {
                string dbPath = await SavePlanAsync(plans);
                errWrs.Drawing = dbPath;
                errWrs.DateReported = DateTime.Now;
                errWrs.Reported = true;
            }

            _context.Entry(errWrs).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ErrWrsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            // var notReportedErrors = await GetErrWrsNotReported();
            return errWrs;
        }


        // POST: api/ErrWrs
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost, DisableRequestSizeLimit]
        public async Task<ActionResult<ErrWrs>> PostErrWrs([FromForm] List<IFormFile> files, [FromForm] string errors)
        {

            var errwrs = JsonConvert.DeserializeObject<List<ErrWrs>>(errors);
            // Console.WriteLine(errwrs);
            var errwsDB = await _context.ErrWrs.Where(w => errwrs.Select(e => e.SwsPn).Contains(w.SwsPn)).ToListAsync();
            var ops = await _context.Operations.Where(w => errwrs.Select(s => s.OperationNum).Contains(w.OperationNum)).ToListAsync();
            var intersectionsErr = errwrs.Where(w => !errwsDB.Select(e => e.SwsPn).Contains(w.SwsPn)).ToList();


            var opName = errwsDB.Select(s => s.OperationNumNavigation.OperationName).ToList();

            if (intersectionsErr.Count > 0)
            {
                // _context.ErrWrs.AddRange(errwrs);
                string dbPath = await SaveFileAsync(files);
                intersectionsErr.ForEach(f => { f.UrlDirectory = dbPath; f.DateError = DateTime.Now; f.Reported = false; });
                _context.ErrWrs.AddRange(intersectionsErr);
                await _context.SaveChangesAsync();
                var union = errwrs.Union(intersectionsErr).Select(s => new
                {
                    s.Id,
                    s.CheckCode,
                    s.SwsPn,
                    opName = ops.Where(w => w.OperationNum == s.OperationNum).First().OperationName,
                    s.DateError,
                    s.ClassFlag1,
                    s.ClassFlag2,
                    s.ClassFlag3,
                    s.ClassFlag4,
                    s.ClassFlag5,
                    s.ClassFlag6,
                    s.Reported,
                    s.Drawing
                });
                var obj = "New Errors";
                var content = "There are some changes in table errors, please check list of errors and upload the plans";
                Message message = new Message(new string[] { "bellous.mohammed@hotmail.com" }, obj, content);
                _emailSender.SendEmail(message);
                return Ok(union);
            }

            return Ok(new { message = "Good" });
        }

        // DELETE: api/ErrWrs/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ErrWrs>> DeleteErrWrs(int id)
        {
            var errWrs = await _context.ErrWrs.FindAsync(id);
            if (errWrs == null)
            {
                return NotFound();
            }

            _context.ErrWrs.Remove(errWrs);
            await _context.SaveChangesAsync();

            return errWrs;
        }

        private bool ErrWrsExists(int id)
        {
            return _context.ErrWrs.Any(e => e.Id == id);
        }

        public async Task<string> SaveFileAsync(List<IFormFile> files)
        {
            string folderName = "Uploads\\files_" + DateTime.Now.ToString("ddMMyyyy_HHmmss");
            string webRootPath = _environment.WebRootPath;
            string pathToSave = Path.Combine(webRootPath, folderName);

            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(pathToSave);
            }

            if (files.Count > 0)
            {
                foreach (IFormFile file in files)
                {
                    if (file.Length > 0)
                    {
                        var fullPath = Path.Combine(pathToSave, file.FileName);
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            await file.CopyToAsync(stream);
                        }


                    }
                }
            }

            return folderName;
        }

        public async Task<string> SavePlanAsync(IFormFile plan)
        {
            string folderName = "Uploads\\drawings\\_" + DateTime.Now.ToString("ddMMyyyy_HHmmss");
            string webRootPath = _environment.WebRootPath;
            string pathToSave = Path.Combine(webRootPath, folderName);

            if (!Directory.Exists(pathToSave))
            {
                Directory.CreateDirectory(pathToSave);
            }


            if (plan.Length > 0)
            {
                var fullPath = Path.Combine(pathToSave, plan.FileName);
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    await plan.CopyToAsync(stream);
                }


            }

            return Path.Combine(folderName,plan.FileName);
        }
    }
}
