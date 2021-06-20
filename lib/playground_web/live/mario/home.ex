defmodule PlaygroundWeb.Live.Mario.Home do
  @moduledoc """
  MultiMario
  """
  use Surface.LiveView
  alias PlaygroundWeb.Components.Mario.Register, as: RegisterComponent

  data name, :string, default: ""

  def handle_event("register", %{"user" => %{"name" => name}}, socket) do
    socket = push_event(socket, "start_game", %{current_player_name: name})
    {:noreply, assign(socket, :name, name)}
  end

  def handle_event(event, %{"name" => name}, socket) do
    socket = push_event(socket, event, %{name: name})
    {:noreply, socket}
  end

  defp name_present(name) do
    String.length(name) >= 2 and String.length(name) <= 5
  end
end
