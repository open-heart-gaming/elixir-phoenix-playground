defmodule PlaygroundWeb.Live.Mario.Home do
  @moduledoc """
  MultiMario
  """
  use Surface.LiveView
  alias PlaygroundWeb.Components.Mario.Register, as: RegisterComponent

  data name, :string, default: ""

  def handle_event("register", %{"user" => %{"name" => name}}, socket) do
    {:noreply, assign(socket, :name, name)}
  end

  defp name_present(name) do
    String.length(name) >= 2 and String.length(name) <= 5
  end
end
