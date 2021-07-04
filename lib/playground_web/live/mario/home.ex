defmodule PlaygroundWeb.Live.Mario.Home do
  @moduledoc """
  MultiMario
  """
  use Surface.LiveView, layout: {PlaygroundWeb.LayoutView, "live.html"}

  alias Playground.Presence
  alias PlaygroundWeb.Components.Mario.Register, as: RegisterComponent

  data name, :string, default: ""

  def handle_event("register", %{"user" => %{"name" => name}}, socket) do
    case Presence.get_meta("mario", name) do
      nil ->
        players = Presence.get_metas("mario")
        Presence.track(self(), "mario", name, %{name: name})
        PlaygroundWeb.Endpoint.subscribe("mario")

        socket =
          push_event(socket, "start_game", %{current_player: %{name: name}, players: players})

        {:noreply, assign(socket, :name, name)}

      _ ->
        {:noreply, put_flash(socket, :error, "Name already used. Please pick a new name.")}
    end
  end

  # Incoming event from JS Hook
  def handle_event(event, %{"name" => name}, socket) do
    # Broadcast the event to all players
    PlaygroundWeb.Endpoint.broadcast("mario", event, %{name: name})
    {:noreply, socket}
  end

  def handle_info(%{topic: "mario", event: "presence_diff", payload: payload}, socket) do
    IO.inspect(payload)
    {:noreply, socket}
  end

  def handle_info(%{topic: "mario", event: event, payload: payload}, socket) do
    # Push the event to the JS
    socket = push_event(socket, event, payload)
    {:noreply, socket}
  end

  defp name_present(name) do
    String.length(name) >= 2 and String.length(name) <= 5
  end
end
