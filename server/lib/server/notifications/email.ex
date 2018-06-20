defmodule Server.Notifications.Email do
  defstruct [:type, :args]
end  

defimpl Server.Notifications, for: Server.Notifications.Email do
  use Bamboo.Phoenix, view: ServerWeb.EmailView
  
  alias Server.Notifications.Mailer
  
  @from "noreply@evaluto.com"

  def send(%{type: "new_account_verification", args: args}) do
    [email, first_name, tenant_name, tenant_code, verification_url] = args
    
    create_email(email, first_name, tenant_name, tenant_code, verification_url)
    |> Mailer.deliver_later()
  end
  
  def send(_), do: raise "Email type not implemented!"
  
  def create_email(email, first_name, tenant_name, tenant_code, verification_url) do
    base_email(email)
      |> to(email)
      |> subject("Verify your email for account-#{tenant_name} (Company code:#{tenant_code})")
      |> assign(:first_name, first_name)
      |> assign(:tenant_name, tenant_name)
      |> assign(:tenant_code, tenant_code)
      |> assign(:verification_url, verification_url)
      |> render("account_verification.html")
      |> render("account_verification.text")
  end
  
  defp base_email(email) do
    new_email()
    |> from(@from)
    |> to(email)
    |> put_html_layout({ServerWeb.LayoutView, "email.html"})
    |> put_text_layout({ServerWeb.LayoutView, "email.text"})
  end
 
end