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

namespace SwsPN.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ErrWrsController : ControllerBase
    {
        private readonly SwsDBContext _context;
        public static IWebHostEnvironment _environment;

        public ErrWrsController(SwsDBContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }


        // GET: api/ErrWrs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ErrWrs>>> GetErrWrs()
        {
            return await _context.ErrWrs.ToListAsync();
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
        [HttpPut("{id}")]
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
    }
}
