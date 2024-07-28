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
				Company = request.Company,
				Email = request.Email,
				Phone = request.Phone,
				Favorite = request.Favorite
			};
			dbContext.Contacts.Add(domainModelContact);
			dbContext.SaveChanges();

			return Ok(domainModelContact);
		}
		[HttpDelete]
		[Route("{id:guid}")]

		public IActionResult DeleteContact(Guid id)
		{
			var contact = dbContext.Contacts.Find(id);
			if (contact is not null)
			{
				dbContext.Contacts.Remove(contact);
				dbContext.SaveChanges();
			}
			return Ok();
		}
		[HttpPut]
		[Route("{id:guid}")]
		public IActionResult ChangeContact(Guid id, UpdateContactRequestDTO request)
		{
			var contact = dbContext.Contacts.Find(id);
			if (contact is null)
			{
				return NotFound();
			}

			contact.Name = request.Name;
			contact.Company = request.Company;
			contact.Email = request.Email;
			contact.Phone = request.Phone;
			contact.Favorite = request.Favorite;

			dbContext.SaveChanges();

			return Ok(contact);
		}
	}
}
