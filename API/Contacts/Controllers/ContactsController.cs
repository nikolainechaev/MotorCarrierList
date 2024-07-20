using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
namespace Contacts.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ContactsController : ControllerBase
	{
		private readonly ContactsDbContext dbContext;
		public ContactsController(ContactsDbContext dbContext)
		{
			this.dbContext = dbContext;
		}
		[HttpGet]
		public IActionResult GetAllcontacts()
		{
			var contacts = dbContext.Contacts.ToList();
			return Ok(contacts);
		}
		[HttpPost]
		public IActionResult AddContact(AddContactRequestDTO request)
		{
			var domainModelContact = new Contact
			{
				Id = Guid.NewGuid(),
				Name = request.Name,
				Email = request.Email,
				Phone = request.Phone,
				Favorite = request.Favorite
			};
			dbContext.Contacts.Add(domainModelContact);
			dbContext.SaveChanges();

			return Ok(domainModelContact);
		}
	}
}
