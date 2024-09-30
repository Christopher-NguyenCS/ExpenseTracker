using System.Globalization;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace SystemTextJson;

public class DateConverter : JsonConverter<DateTimeOffset>
{
    private readonly string _dateFormat = "M/dd/yyyy";

    public override DateTimeOffset Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string dateString = reader.GetString()!;
        DateTime date = DateTime.ParseExact(dateString, _dateFormat, CultureInfo.InvariantCulture);

        DateTimeOffset localDate = new DateTimeOffset(date, TimeZoneInfo.Local.GetUtcOffset(date));
        // DateTimeOffset localDate = new DateTimeOffset(date, TimeZoneInfo.Local.GetUtcOffset(date));
        DateTimeOffset utcDate = localDate.ToUniversalTime();

        return utcDate;
    }
    public override void Write(Utf8JsonWriter writer, DateTimeOffset value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString(_dateFormat));
    }
}

public class TimeConverter : JsonConverter<DateTimeOffset?>
{
    private readonly string _timeFormat = "h:mm tt";

    public override DateTimeOffset? Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        string timeString = reader.GetString()!;
        if (timeString != null)
        {
            DateTimeOffset time = DateTimeOffset.ParseExact(timeString, _timeFormat, CultureInfo.InvariantCulture);
            DateTimeOffset localTime = new DateTimeOffset(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, time.Hour, time.Minute, 0, time.Offset);
            DateTimeOffset utcTime = localTime.ToUniversalTime();
            return utcTime;
        }
        return null;
    }

    public override void Write(Utf8JsonWriter writer, DateTimeOffset? dateTimeValue, JsonSerializerOptions options)
    {
        if (dateTimeValue.HasValue)
        {
            // Convert to UTC before writing
            DateTimeOffset utcValue = dateTimeValue.Value;
            writer.WriteStringValue(utcValue.ToString(_timeFormat));
        }
        else
        {
            writer.WriteNullValue();
        }
    }
}



