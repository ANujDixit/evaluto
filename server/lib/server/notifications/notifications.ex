defprotocol Server.Notifications do
  def send(notification)
end