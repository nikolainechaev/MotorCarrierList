namespace Contacts;

public class Contact
{
	public int Id { get; set; }
	public required string Name { get; set; }
	public required string Company { get; set; }
	public string? Email { get; set; }
	public required string Phone { get; set; }
	public bool Favorite { get; set; }
}
