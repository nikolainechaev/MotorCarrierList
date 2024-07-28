namespace Contacts;

public class AddContactRequestDTO
{
	public required string Name { get; set; }
	public required string Company { get; set; }
	public string? Email { get; set; }
	public required string Phone { get; set; }
	public bool Favorite { get; set; }
}
